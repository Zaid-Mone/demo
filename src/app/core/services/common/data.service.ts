import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from "rxjs"
import { environment } from '../../../environments/environment';
import { APIResponse } from '../../models/common/APIResponse';
import { ResponseResults } from '../../models/common/ResponseResults';


@Injectable({
  providedIn: 'root'
})
export class  DataService<T> {

  /**
   * Url of the service to connect to
   */
  url: string;
  // private _http: HttpClient;

  public resourceName!: string; // Use definite assignment assertion
  public httpGetparams!: string[];
  public paramObj!: HttpParams;
  public ApiName!: string;

  constructor(private http: HttpClient) {
    this.url = environment.API_LiveURL;
  }



  httpGet(): Observable<T> {
    const href = this.url + this.resourceName + this.ApiName;
    var requestUrl = `${href}`;
    this.httpGetparams.forEach(function (value) {
      requestUrl = requestUrl + value;

    });
    var temp = this.http.get<T>(requestUrl);
    //var temp = this.http.get<T>(requestUrl, { params:obj });
    return temp;
  }


  httpGetWithParam<T>(param: HttpParams) {

    const href = this.url + this.resourceName + this.ApiName;
    var requestUrl = `${href}`;
    var temp = this.http.get<T>(requestUrl, { params: param });
    return temp;
  }


  httpGetWithoutParam<T>() {
    const href = this.url + this.resourceName + this.ApiName;
    var requestUrl = `${href}`;
    var temp = this.http.get<T>(requestUrl);
    return temp;
  }





  httpPost(obj: T): Observable<APIResponse<T>> {
    const href = this.url + this.resourceName + this.ApiName;
    var requestUrl = `${href}`;
    return this.http.post<APIResponse<T>>(requestUrl, obj)
      .pipe(map(response => {
        return response;
      }));
  }


  Add(obj: T) {
    return this.http.post<ResponseResults>(this.url + this.resourceName + "Add", obj)
      .pipe(map(response => {
        return response;
      }));
  }


  Update(obj: T) {
    return this.http.post<ResponseResults>(this.url + this.resourceName + "Update", obj)
      .pipe(map(response => {
        return response;
      }));
  }

  Delete(obj: T, id: number) {
    const href = this.url + this.resourceName + "Delete"
    var requestUrl =
      `${href}?id=${id}`;
    return this.http.post<ResponseResults>(requestUrl, obj)
      .pipe(map(response => {
        return response;
      }));
  }


  GetByID(id: number): Observable<T> {
    const href = this.url + this.resourceName + id;
    var requestUrl =
      `${href}?id=${id}`;
    var temp = this.http.get<T>(requestUrl);
    return temp;
  }



  private handleError(error: Response) {

    if (error.status === 404) {
      // return Observable.throw(new NotFoundError(error, this.resourceName));
    }

    if (error.status === 401) {
      //  return Observable.throw(new UnAuthorizedError(error, this.resourceName));
    }

    if (error.status === 400) {
      //return Observable.throw(new BadRequestError(error, this.resourceName));
    }

    //return Observable.throw(new UnknownError(error))

  }

}
