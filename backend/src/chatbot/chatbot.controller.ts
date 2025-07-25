import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { OpenAI } from 'openai';

@Controller('chat')
export class ChatbotController {
  private openai: OpenAI;
  constructor(private configService: ConfigService) {
    const apiKey = process.env.OPENAI_API_KEY;
    // It's still good to have a check, though ideally ConfigModule prevents this
    if (!apiKey) {
         console.error('OPENAI_API_KEY is not set in environment variables.');
         throw new Error('Chatbot initialization failed: OPENAI_API_KEY is missing.');
    }

    this.openai = new OpenAI({
      apiKey: apiKey, // Use the API key retrieved from ConfigService
    });
  }

  @Post()
  async chat(@Body('message') message: string, @Res() res: Response) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4.1-nano",
        messages: [{ role: "user", content: message }],
      });
      res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
      console.error("OpenAI API error:", error.message);
      res.status(500).json({ error: "Failed to get response from GPT." });
    }
  }
}