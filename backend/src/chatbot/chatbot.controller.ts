import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { OpenAI } from 'openai';

@Controller('chat')
export class ChatbotController {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
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