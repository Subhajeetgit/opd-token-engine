export class Token{
    constructor({tokenId, patientId, source, priority}){
        this.tokenId=tokenId;
        this.patientId=patientId;
        this.source=source;
        this.priority=priority;
        this.status="ACTIVE";
        this.createdAt=new Date();
    }
}