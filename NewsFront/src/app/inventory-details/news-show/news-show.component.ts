import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IInventoryDetail } from 'src/app/shared/inventory-detail.interface';
import { InventoryDetail } from 'src/app/shared/inventory-detail.model';
import { InventoryDetailService } from 'src/app/shared/inventory-detail.service';

@Component({
  selector: 'app-news-show',
  templateUrl: './news-show.component.html',
  styleUrls: ['./news-show.component.scss']
})
export class NewsShowComponent implements OnInit {

  
  inventoryDetail  :  IInventoryDetail = {} as IInventoryDetail;
  isError:boolean = false;
 
  
  constructor(private router:ActivatedRoute, private service:InventoryDetailService) { 

  }

  postData: IInventoryDetail = {} as IInventoryDetail;
  


  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.loadPost(params.id);
    });
  }

  
  loadPost(id : number ) {
    this.service.getPost(id).subscribe((post) => {
      this.postData = post;
    },(err) => {
      
    })
  }
  
}
