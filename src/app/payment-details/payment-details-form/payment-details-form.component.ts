import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscriber } from 'rxjs';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';


@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  styles: [
  ]
})
export class PaymentDetailsFormComponent implements OnInit {

  constructor(public service:PaymentDetailService,
    private toastr:ToastrService  ) { }

  ngOnInit(): void {
  }
onSubmit(form:NgForm){
  console.log(this.service.formData.paymentDetailId);
  if(this.service.formData.paymentDetailId==0)
  this.insertRecord(form);
  else
  this.updateRecord(form);


}
insertRecord(form:NgForm){
  this.service.postPaymentDetail().subscribe(
    res => {
      this.resetForm(form);
      this.toastr.success('Submitted sucessfully','Payment Detail Register')
      this.service.refreshlist();

    },
    err => {console.log(err); }

  );
}

updateRecord(form:NgForm){
  this.service.putPaymentDetail().subscribe(
    res => {
      this.resetForm(form);
      this.service.refreshlist();
      this.toastr.info('Updated sucessfully','Payment Detail Register')
      this.service.refreshlist();
    },
    err => {console.log(err); }

  );

}
resetForm(form:NgForm){
  form.form.reset();
  this.service.formData=new PaymentDetail();
}
}


