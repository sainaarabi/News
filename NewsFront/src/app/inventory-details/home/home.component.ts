import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InventoryDetail } from 'src/app/shared/inventory-detail.model';
import { InventoryDetailService } from 'src/app/shared/inventory-detail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   
  constructor(public service: InventoryDetailService,
    private toastr: ToastrService , private router: Router) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  onDelete(id: number) {
    if (confirm("آیا از حذف این  خبر اطمینان دارید")) {
      this.service.deleteInventoryDetail(id)
      .subscribe( res => {
        this.service.refreshList();
        this.toastr.error("با موفقیت حذف شد", " ثبت جزییات فهرست");
      },
      err => { console.log(err); }
      )
    }
  }

  populateForm(selectedRecord: InventoryDetail) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  signout() {
    localStorage.clear()
    this.router.navigate(['.'])
  }

}
