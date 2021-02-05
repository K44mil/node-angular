import { Injectable } from '@angular/core';

import { environment } from '@env/environment';
import { io } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketService {

    public socket;

    constructor() {
        this.socket = io(environment.serverUrl, { withCredentials: true });
    }
} 