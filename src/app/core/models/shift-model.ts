export class ShiftModel {
    shiftId	:Number=0;
    operativeId	:Number=0; 
    startTime	:string ="";
    startLongitude	:string ="";
    startLatitude	:string ="";
    stopTime	:string ="";
    stopLongitude	:string ="";
    stopLatitude	:string ="";
    shiftStatus	:string ="";
    createdOn	:string ="";
    createdBy	:string ="";
}
export class StartJobShiftModel {
    jobId	:Number=0;
    operativeId	:Number=0; 
    startTime	:string ="";
    startLongitude	:string ="";
    startLatitude	:string =""; 
} 
export class StartShiftModel {
    operativeId	:Number=0; 
    startTime	:string ="";
    startLongitude	:string ="";
    startLatitude	:string =""; 
}   
export class StopShiftModel {
    shiftId	:Number=0; 
    operativeId	:Number=0; 
    stopTime	:string ="";
    stopLongitude	:string ="";
    stopLatitude	:string =""; 
}
 