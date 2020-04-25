import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from './Person.model'
@Injectable()
export class ProductsdataService {
  private url1 = "http://localhost:8080/getdata";
  private url2 = "http://localhost:8080/getdata/1";
  private url3 = "http://localhost:8080/addperson";

  constructor(private http:HttpClient) { }
  SelectedPerson: Person;
  Persons:Person[];
  public GetData():any{
    return this.http.get(this.url1)
  }
  public GetId():any{
    return this.http.get(this.url2)
  }
  public InsertPerson(person:Person):any{
    return this.http.post(this.url3, person)
  }
  public DeletePerson(id: any){
    return  this.http.delete(this.url1 + `/${id}`)
  }
}