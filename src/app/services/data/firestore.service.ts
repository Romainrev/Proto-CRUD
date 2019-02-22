import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Song } from '../../models/song.interface';
import {AngularFirestoreCollection} from 'angularfire2/firestore';
import {AngularFirestoreDocument} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) { }
  createSong(
      albumName: string,
      artistName: string,
      songDescription: string,
      songName: string
  ): Promise<void> {
    const id = this.firestore.createId();

    return this.firestore.doc(`songList/${id}`).set({
      id,
      albumName,
      artistName,
      songDescription,
      songName,
    });
  }
  getSongList(): AngularFirestoreCollection<Song> {
    return this.firestore.collection(`songList`);
  }
  getSongDetail(songId: string): AngularFirestoreDocument<Song> {
    return this.firestore.collection('songList').doc(songId);
  }
  deleteSong(songId: string): Promise<void> {
    return this.firestore.doc(`songList/${songId}`).delete();
  }
}
