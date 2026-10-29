import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ButtonModule} from 'primeng/button';
import {UserDTO} from '../../rest/dto/UserDTO';
import {TwofactorRest} from '../../rest/twofactor-rest';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {SharedUserService} from '../communication/shared-user-service';
import {VerifyRequest} from '../../rest/dto/VerifyRequest';

@Component({
  selector: 'app-two-way-authentication',
  imports: [ReactiveFormsModule,ButtonModule,FloatLabel,InputText],
  templateUrl: './two-way-authentication.html',
  styleUrl: './two-way-authentication.css',
})
export class TwoWayAuthentication implements OnInit{

  private readonly mfaService = inject(TwofactorRest);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly sharedUserService = inject(SharedUserService);


  imageBytes: SafeUrl = ''

  ngOnInit(): void {
    this.getUserId.setValue("mgerrit2");

    this.sendUserId(this.getUserId.value)
  }


  form = new FormGroup({
    numberToValidate: new FormControl(''),
    isValidateCode: new FormControl(''),
    userId: new FormControl(''),
  });

  get getNumberToValidate(): FormControl {
    // We cast it to FormControl to easily access its value property later
    return this.form.get('numberToValidate') as FormControl;
  }

  get getIsValidateCode(): FormControl {
    // We cast it to FormControl to easily access its value property later
    return this.form.get('isValidateCode') as FormControl;
  }

  get getUserId(): FormControl {
    // We cast it to FormControl to easily access its value property later
    return this.form.get('userId') as FormControl;
  }

  public userIdFocusOut(): void{
    this.sendUserId(this.getUserId.value)
  }

  sendUserId(userId: string): void {
   this.sharedUserService.updateUserId(userId)

  }


  public  getQrCode(): void {

    this.getNumberToValidate.setValue('');
    this.getIsValidateCode.setValue('');

    this.getNumberToValidate.setValue('');
    this.getIsValidateCode.setValue('');

    const currentUser: UserDTO = {
      id: 1,
      cdsid: "mgerrit2",
      secret: "",
      tempSecret: null,
      mfaEnabled: true,
      hashPassword: "SafePassword123!",
      active: true,
      personId: 1,
      roles: [
        { id: 1, name: "ROLE_USER" },
        { id: 2, name: "ROLE_ADMIN" }
      ]
    };

    this.mfaService.setupDevice().subscribe({
      next: (res) => {
        // bypassSecurityTrustUrl zorgt ervoor dat Angular de data:image/png;base64 string blindelings vertrouwt
        this.imageBytes = this.sanitizer.bypassSecurityTrustUrl(res.qrCode);
      },
      error: (err) => {
        console.error('Fout bij laden QR code', err);
      }
    });
  }

  public validateCode(): void {

    const verifyRequest: VerifyRequest = {
      code: this.getNumberToValidate.value
    }

    this.mfaService.verifyCode(verifyRequest).subscribe({
      next: (res) => {
        this.getIsValidateCode.setValue('valid code');
        // bypassSecurityTrustUrl zorgt ervoor dat Angular de data:image/png;base64 string blindelings vertrouwt
        console.log(res);
      },
      error: (err) => {
        this.getIsValidateCode.setValue(err.error);
        console.error('Fout bij laden QR code',err.error);
      }
    });

  }



}
