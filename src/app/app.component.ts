import { Component, HostListener, OnInit } from "@angular/core";
import { DogsService } from "./dogs.service";

// URL of dog api:
// https://dog.ceo/api/breeds/image/random
//{"message":"https:\/\/images.dog.ceo\/breeds\/akita\/Akita_hiking_in_Shpella_e_Pellumbasit.jpg","status":"success"}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

  title = "coding-challenge";
  dogUrl = "";
  dogHistory: Array<string> = [];
  historyIndex: number = 0;

  constructor(private dogsService: DogsService) {
  }

  ngOnInit(): void {
      this.getDog();
  }

  public onClickPrevious() {
    if(this.historyIndex) {
      this.historyIndex--;
      this.getDogFromHistory();
    }
  }

  public onClickNext() {
    this.historyIndex++;
    if(this.historyIndex === this.dogHistory.length) {
      this.getDog();
    } else {
      this.getDogFromHistory();
    }
  }

  getDog() {
    this.dogsService.getDog().subscribe((dogData)=>{
      this.saveDog(dogData["message"]);
      this.dogUrl = dogData["message"];
    });
  }

  getDogFromHistory() {
    this.dogUrl = this.dogHistory[this.historyIndex];
  }

  saveDog(dogUrl: string) {
    this.dogHistory.push(dogUrl);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event.key)
    if (event.key === "ArrowLeft") {
      this.onClickPrevious();
    }
    if (event.key === "ArrowRight") {
      this.onClickNext();
    }
  }

}
