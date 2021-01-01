import { Injectable } from '@nestjs/common';
import { Flashcard } from './flashcard';
import { Flashcards } from './flashcards';

@Injectable()
export class FlashcardsService {
  private readonly flashcards: Flashcards = {
    1: {
      id: 1,
      description: 'sadddddddddddddddddddddddddddddd',
      title: 'tytul',
      cover: 'cover'
    }
  }

  public findAll(): Flashcards {
    return this.flashcards;
  }

  public create(newFlashcard: Flashcard): void {
    const id = Date.now();
    this.flashcards[id] = {...newFlashcard, id }
  }

  public find(id: number): Flashcard {
    const flashCard = this.flashcards[id];
    if (!flashCard) throw new Error("No flashcards found.")
    return flashCard;
  }

  public update(payload: Flashcard): void {
    if (!this.flashcards[payload.id]) throw new Error("No flashcards found.")
    this.flashcards[payload.id] = payload;
  }

  public delete(id: number): void {
    const flashcard: Flashcard = this.flashcards[id];
    if (!flashcard) throw new Error("No flashcards found.");
    delete this.flashcards[id];
  }
}
