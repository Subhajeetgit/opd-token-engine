import { allocationEngine } from "../bootstrap.js";
export const createToken=(req, res)=>{
    try{
        const {slotId, patientId, source}=req.body;
        if(!slotId || !patientId || !source){
            return res.status(400).json({error: "slotId, patientId is required"});
        }

        const token= allocationEngine.createToken({slotId, patientId, source});
        res.status(201).json(token);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}


export const cancelToken = (req,res)=>{
    const{slotId, tokenId} = req.body;
    if (!slotId || !tokenId) {
    return res.status(400).json({ error: "slotId and tokenId required" });
  }

  allocationEngine.cancelToken(slotId, tokenId);
  res.json({ status: "cancelled" });
};