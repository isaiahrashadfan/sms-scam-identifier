import OpenAI from "openai";
import 'dotenv/config'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
    const data = await request.json()

    // this is the received request body as a JSON
    // use it, do logic, give back an expected response as a JSON below
    console.log(data) 

    const chatCompletion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are an assistant that differentiates between spam and real text messages. With a provided text message, respond with 'Spam' or 'Real' depending on the content of the message." },
            { role: "user", content: data.message }
        ],
        model: "gpt-4o-mini",
        
    });

    const response = {
        content: chatCompletion.choices[0].message.content
        
    }
    
    console.log(response.content)

    return new Response(JSON.stringify(response), { status: 200 })
}