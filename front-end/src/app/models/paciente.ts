export class Paciente {
    _id?: number;
    mat: String;
    nom: String;
    apeP: String;
    apeM: String;
    calle: String;
    no: String;
    col: String;
    ciudad: String;
    cp: Number;
    numTelCa: String;
    numTelAsp: String;
    numTelMaPa: String;
    mail: String;
    cD: String;
    pD: String;
    coment: String;
    SLAO?: number;
    SLOD?: number;
    SLOI?: number;
    CLAO?: number;
    CLOD?: number;
    CLOI?: number;
    fechReg: Date;
    carrCur: String;
    foto?: string;
    cert?: String;

    constructor(mat: String, nom: String, apeP: String, apeM: String, calle: String, no: String, col: String,
        ciudad: String, cp: Number, numTelCa: String, numTelAsp: String, numTelMaPa: String, mail: String, cD: String, pD: String,coment: String, fechReg: Date, carrCur: String, foto: string, cert: String, SLAO?: number, SLOD?: number, SLOI?: number, CLAO?: number, CLOD?: number, CLOI?: number) {
        this.nom = nom;
        this.mat = mat;
        this.apeP = apeP;
        this.apeM = apeM;
        this.calle = calle;
        this.no = no;
        this.col = col;
        this.ciudad = ciudad;
        this.cp = cp;
        this.numTelCa = numTelCa;
        this.numTelAsp = numTelAsp;
        this.numTelMaPa = numTelMaPa;
        this.mail = mail;
        this.cD = cD;
        this.pD = pD;
        this.SLAO = SLAO;
        this.SLOD = SLOD;
        this.SLOI = SLOI;
        this.CLAO = CLAO;
        this.CLOD = CLOD;
        this.CLOI = CLOI;
        this.coment = coment;
        this.fechReg = fechReg;
        this.carrCur = carrCur;
        this.foto = foto;
        this.cert = cert;
    }
}

