import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class RedditService {
    http: any;
    baseURL: string;

    constructor (http: Http){
        this.http = http;
        this.baseURL = 'https://www.reddit.com/r';
    }

    getPosts(category, limit, sort, before, after) {
        let url = this.baseURL+'/'+category+'/'+sort+'.json?limit='+limit;

        if(before != null)
            url += "&before="+before;
        else if(after != null)
            url += "&after="+after;

        console.log(url);

        return this.http.get(url).map(res => res.json());
    }
}
