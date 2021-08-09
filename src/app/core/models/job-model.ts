export class JobModel {
    jobId : Number=0;
    name : string=""; 
    description	: string=""; 
    createdOn : string=""; 
}

export class JobRequestModel {
    jobId : Number=0;
    name : string=""; 
    description	: string="";  
}

export class JobShiftModel {
    jobShiftId	: number=0;
    operativeId	: number=0;
    startTime	:any; 
    startLongitude: string=""; 
    startLatitude	: string="";	
    stopTime	: string="";	 
    stopLongitude	: string="";	
    stopLatitude	: string="";	
    shiftStatus: string="";	
    createdOn	: string="";	
    createdBy	: string="";	
}

 