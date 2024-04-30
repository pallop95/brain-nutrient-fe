import { inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  authState,
  User,
  user,
  idToken,
} from "@angular/fire/auth";
import { Firestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private _firestore = inject(Firestore);
  private authState$ = authState(this.afAuth);
  private user$ = user(this.afAuth);
  private idToken$ = idToken(this.afAuth);

  constructor(
    private afAuth: Auth,
    private authService: AuthService,
  ) { }

  signUp(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.afAuth, email, password));
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.afAuth, email, password));
  }

  logout(): Observable<any> {
    return from(this.afAuth.signOut());
  }

  /*
  // https://pawelidziak.medium.com/firebase-authentication-tutorial-angularfire-7-4-auth-firestore-google-facebook-email-2023-89e1b910902c
  byGoogle(): Promise<UserCredential> {
    // you can simply change the Google for another provider here
    return signInWithPopup(this.afAuth, new GoogleAuthProvider()).then(
      (auth) => this._setUserData(auth)
    );
  }

  private _setUserData(auth: UserCredential): Promise<User> {
    const user: User = {
      uid: auth.user.uid,
      name: (auth.user.displayName || auth.user.email)!,
      email: auth.user.email!,
      emailVerified: auth.user.emailVerified,
      // custom ones
      // lastRoute: string;
      // configId: string;
    };
    const userDocRef = doc(this._firestore, `users/${user.id}`);
    return setDoc(userDocRef, user).then(() => user);
  }
  */

  getCurrentUser(): Observable<User | null> {
    return this.user$;
  }
}
