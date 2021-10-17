import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InventoryDetail } from 'src/app/shared/inventory-detail.model';
import { InventoryDetailService } from 'src/app/shared/inventory-detail.service';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.scss']
})
export class InventoryDetailComponent implements OnInit {

  constructor(public service: InventoryDetailService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.inventoryDetailId == 0) {
      this.insertReocrd(form);
    } else {
      this.updateRecord(form);
    }
  }

  insertReocrd(form: NgForm) {
    this.service.postInventoryDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success("خبر با موفقیت ثبت شد", "ثبت جزییات فهرست");
      },
      err => { console.log(err); }
    );
  }

  updateRecord(form: NgForm) {
    this.service.putInventoryDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info("ویرایش با موفقیت انجام شد", " ثبت جزییات فهرست");
      },
      err => { console.log(err); }
    );
  }
   
  refresh () :void {
    window.location.reload();
  }
  
  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new InventoryDetail();
  }
 
  
}
