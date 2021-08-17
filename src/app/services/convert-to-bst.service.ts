import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertToBSTService {

  constructor() { }

  
  getLondonTime(d:any, obj:any) { 
    d = d || new Date(); 
    var dstS = this.getLastSunday(d.getFullYear(), 3);
    var dstE = this.getLastSunday(d.getFullYear(), 10);
    dstS = new Date(Date.UTC(dstS.getFullYear(), dstS.getMonth(), dstS.getDate(),1));
    dstE = new Date(Date.UTC(dstE.getFullYear(), dstE.getMonth(), dstE.getDate(),1)); 
    if (d > dstS && d < dstE) {
      d.setUTCHours(d.getUTCHours() +1);
      return this.formatDate(d, 60);
    } 
    return obj? d : this.formatDate(d,null);
  }
  getLastSunday(year:any, month:any) { 
    var d = new Date(year, month, 0); 
    d.setDate(d.getDate() - d.getDay());
    return d;
  }
  formatDate(d:any, offset:any) {
    function z(n:any){return ('0'+n).slice(-2)} 
    offset = offset || 0; 
    var offSign = offset < 0? '-' : '+';
    offset = Math.abs(offset);
    var offString = offSign + ('0'+(offset/60|0)).slice(-2) + ':' + ('0'+(offset%60)).slice(-2); 
    return d.getUTCFullYear() + '-' + z(d.getUTCMonth()+1) + '-' + z(d.getUTCDate()) +
           'T' + z(d.getUTCHours()) + ':' + z(d.getUTCMinutes()) + ':' + z(d.getUTCSeconds()) +
           offString;
  } 
}
