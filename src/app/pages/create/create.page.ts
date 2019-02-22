import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  public createSongForm: FormGroup;

  constructor(
      public loadingCtrl: LoadingController,
      public alertCtrl: AlertController,
      public firestoreService: FirestoreService,
      formBuilder: FormBuilder,
      public router: Router
  ) {
    this.createSongForm = formBuilder.group({
      albumName: ['', Validators.required],
      artistName: ['', Validators.required],
      songDescription: ['', Validators.required],
      songName: ['', Validators.required],
    });
  }
  async createSong() {
    const loading = await this.loadingCtrl.create();
    const albumName = this.createSongForm.value.albumName;
    const artistName = this.createSongForm.value.artistName;
    const songDescription = this.createSongForm.value.songDescription;
    const songName = this.createSongForm.value.songName;

    this.firestoreService
        .createSong(albumName, artistName, songDescription, songName)
        .then(
            () => {
              loading.dismiss().then(() => {
                this.router.navigateByUrl('/home');
              });
            },
            error => {
              console.error(error);
            }
        );

    return await loading.present();
  }
  ngOnInit() {
  }

}
