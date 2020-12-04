import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private afStore: AngularFirestore) {}

  createBlog(blog: Blog) {
    const blogRef: AngularFirestoreCollection<Blog> = this.afStore.collection(
      `blogs`
    );
    return blogRef.add(blog).then((docRef) => {
      blogRef.doc(docRef.id).update({ bid: docRef.id });
    });
  }
  allBlogs(uid = '') {
    return uid === ''
      ? this.afStore.collection<Blog>('blogs').valueChanges()
      : this.afStore
          .collection<Blog>('blogs', (ref) => ref.where('uid', '==', uid))
          .valueChanges();
  }
  viewBlog(bid: string) {
    const view = firestore.FieldValue.increment(1);
    this.afStore.doc(`blogs/${bid}`).update({ views: view });
    return this.afStore
      .collection<Blog>(`blogs`, (ref) => ref.where('bid', '==', bid))
      .valueChanges();
  }
  searchBlogs(start, end) {
    return this.afStore
      .collection<Blog>('blogs', (ref) =>
        ref.orderBy('title').startAt(start).endAt(end)
      )
      .valueChanges();
  }
}
