import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertToBSTService {

  constructor() { }

  
  getLondonTimeZone() { 
    var d =   new Date(); 
    var dstS = this.getLastSunday(d.getFullYear(), 3);
    var dstE = this.getLastSunday(d.getFullYear(), 10);
    dstS = new Date(Date.UTC(dstS.getFullYear(), dstS.getMonth(), dstS.getDate(),1));
    dstE = new Date(Date.UTC(dstE.getFullYear(), dstE.getMonth(), dstE.getDate(),1)); 
    if (d > dstS && d < dstE) { 
      return "+0100"
    } 
    return "+0000"
  }
  getLastSunday(year:any, month:any) { 
    var d = new Date(year, month, 0); 
    d.setDate(d.getDate() - d.getDay());
    return d;
  }
  
}
