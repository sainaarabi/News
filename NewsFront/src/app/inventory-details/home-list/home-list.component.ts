import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InventoryDetail } from 'src/app/shared/inventory-detail.model';
import { InventoryDetailService } from 'src/app/shared/inventory-detail.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  
  page: number = 1;   
  p: number = 1;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(public service: InventoryDetailService,
    private toastr: ToastrService) { }

  ngOnInit() {
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
}
