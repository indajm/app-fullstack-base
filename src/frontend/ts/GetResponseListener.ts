/* La clase FrameWork va a responder a esta interfaz en vez de al main */

interface GetResponseListener{
    handleGetResponse(status: number, response: string);
    
}