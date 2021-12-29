/* La clase FrameWork va a responder a esta interfaz en vez de al main */

interface PostResponseListener{
    handlePostResponse(status: number, response: string):void;
    
}