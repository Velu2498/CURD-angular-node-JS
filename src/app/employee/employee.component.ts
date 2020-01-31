import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
 cards;

  constructor(private http:HttpClient,private location: Location) {
    
  
  this.http.get("http://localhost:3000/details")
  .subscribe((data)=>{
    console.log(data)
    this.cards=data
    // alert("ok")
  })
  

  // console.log(this.data.controls.Name.valid,"ilyry")
  }

  ngOnInit() {
 
  }

@Input() Name=""
@Input() email=""
@Input() pass=""

 //getting values from form
 data = new FormGroup({
  Name: new FormControl('',[Validators.required]),
  email: new FormControl('',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]),
  password: new FormControl('',[Validators.required,, Validators.pattern('^[0-9+]*'), Validators.maxLength(10)]),
});

ngOnChanges(){
  console.log("updated from onchanges in form")
}

//insert the value to database
add(email){
  console.log(email)
  // console.log(this.data.value)
    this.http.post("http://localhost:3000/data/"+email,this.data.value)
    .subscribe(
      (data:any)=>{
      alert(data.mess);
      // console.log(data)
    }, error => {
        console.log(error);
    }
    )
    location.reload();
    // console.log(this.data.valid)
    // console.log(this.data.controls.Name.valid)

  }

  del(id){
  // console.log(id)
  this.http.delete("http://localhost:3000/data/"+id)
  .subscribe()
  location.reload();
  }

  up(id){
    // console.log("http://localhost:3000/setval/"+id)
    // this.data.setValue(
    //   { Name: "velu", email: "Mohan@gmail.com", password: "12344"},
    // );
    this.http.put("http://localhost:3000/setval/"+id,this.data.value)
    .subscribe(
      (data:any)=>{
         this.data.setValue(
      { Name: data.Name, email: data.email, password: data.password},
    );
      // alert(data.Name);
    }, error => {
        console.log(error);
    }
    )
    // location.reload();
  }

  update(id){
    console.log(id)
    this.http.put("http://localhost:3000/update/"+id,this.data.value)
    .subscribe(
      (data:any)=>{
      // alert(data.Name);
    }, error => {
        console.log(error);
    }
    )
    location.reload();
  }

}

