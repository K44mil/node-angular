import { Injectable } from '@angular/core';
import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';

@Injectable({ providedIn: 'root' })
export class CryptService {
   
    private secret: string = '23df833be15d3ab59ba66172bcfb78a0';

    encrypt(data: string): string {
        if (!data) return null;
        return CryptoAES.encrypt(data, this.secret);
    }

    decrypt(data: string): string {
        if (!data) return null;
        try {
            return CryptoAES.decrypt(data, this.secret).toString(CryptoENC);
        } catch (err) {
            return null;
        } 
    }
}