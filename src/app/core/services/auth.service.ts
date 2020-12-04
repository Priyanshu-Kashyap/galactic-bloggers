import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { User } from "../models/user";

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<User>;
  constructor(
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async loginWithGoogle() {
    const credential = await this.afAuth.signInWithPopup(
      new auth.GoogleAuthProvider()
    );
    this.router.navigate(['/profile']);
    return this.updateUserData(
      credential.user,
      this.emailToUsername(credential.user.email)
    );
  }
  async signIn({ email, password, name }) {
    const credential = await auth().createUserWithEmailAndPassword(
      email,
      password
    );
    await credential.user.updateProfile({
      displayName: name,
    });
    this.router.navigate(['/profile']);
    return this.updateUserData(
      credential.user,
      this.emailToUsername(credential.user.email)
    );
  }
  async logIn({ email, password }) {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }
  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }
  getUser(uid: string) {
    return this.afStore.doc<User>(`users/${uid}`).valueChanges();
  }
  private updateUserData(
    { uid, email, displayName, photoURL }: User,
    username: string
  ) {
    if (!photoURL)
      photoURL = 'https://img.icons8.com/fluent/96/000000/test-account.png';
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(
      `users/${uid}`
    );
    const data = {
      uid,
      email,
      displayName,
      username: username,
      photoURL,
    };
    return userRef.set(data, { merge: true });
  }

  emailToUsername(email: string) {
    return email
      .replace(email.slice(email.indexOf('@'), email.length), '')
      .toLowerCase();
  }
}
