// JavaScript example of using the ChatGPT API for chat completion
// See https://platform.openai.com/docs/api-reference/ for examples of other APIs you can use


import dotenv from "dotenv"
import OpenAI from "openai";


// Configure the process environment variables, including your OpenAI API key
dotenv.config({
  path: "../.env"
})

// Configure the OpenAI client
const openai = new OpenAI( {
  apiKey: process.env.OPENAI_API_KEY
});

let history = [];

// Create a generic function that calls the OpenAI API for chat completion
async function chat(content) {
  history.push({ role: "user", content });
  console.log(history);
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: history,
    max_tokens: 100,
    n: 1,
    stop: null,
    temperature: 0.5,
  });
  const responseText = completion.choices[0].message.content;
  console.log(responseText);
  history.push({ role: "system", content: responseText });
  return responseText;
}

// Print the response of the API call
async function runExamples() {
  console.log(await chat("Who was Luke Skywalker's father?"));
  console.log(await chat("How many students are currently enrolled at UCLA?"));
}

runExamples().catch(console.error);

/* EXAMPLE RESPONSE:
   [
      {
        index: 0,
        message: { role: 'assistant', content: 'Darth Vader (Anakin Skywalker)' },
        logprobs: null,
        finish_reason: 'stop'
      }
    ]
    [
      {
        index: 0,
        message: {
          role: 'assistant',
          content: 'As of the fall 2021 semester, UCLA has an enrollment of approximately 45,600 undergraduate and 13,600 graduate students, for a total of around 59,200 students.'
        },
        logprobs: null,
        finish_reason: 'stop'
      }
    ]
 */