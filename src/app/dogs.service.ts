import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "aplication/json" })
};

@Injectable()
export class DogsService {

    constructor(private httpClient: HttpClient) { }

    public getDog(): Observable<any> {
        return this.httpClient.get("https://dog.ceo/api/breeds/image/random");
    }
}
