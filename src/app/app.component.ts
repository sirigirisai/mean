import { Component, OnInit} from '@angular/core';
import { ProductsdataService } from './productsdata.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent implements OnInit {
  public persons:any;
  public id:any;
  constructor(private productsdata:ProductsdataService, private toastr: ToastrService){ }

  ngOnInit() {
    this.RefreshData()
    this.ResetForm();
    //GET individual person' name
    this.productsdata.GetId()
    .subscribe((res =>{
      this.id = res;
    }))
  };

  //Refresh
  RefreshData(){
    //GET all persons data
  this.productsdata.GetData()
  .subscribe((res => {this.persons = res;}));
  };

    //Insert Person 
    AddPerson(data, form:NgForm){
      this.productsdata.InsertPerson(data)
      .subscribe(res => console.log("insertion was success", res),
                  error => console.log("Error occured while insertion", error));
      this.toastr.success("Inserted");
      this.RefreshData();      
    };
    
    //Delete Person
    deletePerson(id: any, form:NgForm){
      this.toastr.warning("Deleted");
      this.productsdata.DeletePerson(id)
      .subscribe((res) =>{ 
      })
      this.RefreshData();
      // this.ResetForm(form);
    }

    //Reset Form
    ResetForm(form?:NgForm){
      if(form)
      form.reset();
      this.productsdata.SelectedPerson ={
        id:"",
        NAME:"",
        AGE:"",
        HEIGHT:"",
        WEIGHT:""
      }
      this.RESULT = "";
      this.RefreshData();
    }

    // BMI Calculator
    // public bmi:any;
    public HEIGHT
    public WEIGHT 
    public bmi;
    public bmiresult;
    public NAME;
    public RESULT;
    public STATUS;
    public statusColor;
    
    bmical(){
     this.bmi = this.WEIGHT/Math.pow(this.HEIGHT,2);
     this.bmi = Math.round(0.0 + this.bmi);
     if(this.bmi <= 18.5){
       this.bmiresult = "Underweight";
       this.statusColor ={
        color: "red"
       }

       
     }
     else if(this.bmi >= 18.5 && this.bmi <= 24.9){
      this.bmiresult = "Normal Weight";
      this.statusColor ={
        color: "red"
       }
     }
     else if(this.bmi >= 25 && this.bmi <= 29.9){
      this.bmiresult = "Overweight";
      this.statusColor ={
        color: "red"
       }
     }
     else if(this.bmi >= 30 && this.bmi <= 34.9){
      this.bmiresult = "Obesity (Class 1)	";
      this.statusColor ={
        color: "red"
       }
     }
     else if(this.bmi >= 35 && this.bmi <= 39.9){
      this.bmiresult = "Obesity (Class 2)	";
      this.statusColor ={
        color: "red"
       }
     }
     else {
       this.bmiresult = "Extreme Obesity (Class 3)"
       this.statusColor ={
        color: "red"
       }
     }
     Math.round(this.bmiresult);
     this.RESULT = `Hello ${this.NAME}, your Body Mass Index is ${this.bmi}`;
     this.STATUS = `And your BMI Status is ${this.bmiresult}`
     };//BMI Function ends


}//AppComponent Ends
