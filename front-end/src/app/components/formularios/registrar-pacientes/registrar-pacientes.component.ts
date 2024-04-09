import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from 'src/app/models/paciente';
import { Ciudad } from 'src/app/models/ciudad';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PacienteServices } from 'src/app/services/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-pacientes',
  templateUrl: './registrar-pacientes.component.html',
  styleUrls: ['./registrar-pacientes.component.css']
})
export class RegistrarPacientesComponent {

  pacienteForm: FormGroup;
  loader = true;
  id: string | null;
  private fileTmp:any;
  fileTypes: { [key: string]: string } = {};

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    public sanitizer: DomSanitizer,
    private _pacienteService: PacienteServices,
    private aRoute: ActivatedRoute) {
    this.fileTmp = {};
    this.pacienteForm = this.fb.group({
      nom: ['', Validators.required],
      apeP: ['', Validators.required],
      apeM: ['', Validators.required],
      calle: ['', Validators.required],
      no: ['', Validators.required],
      col: ['', Validators.required],
      ciudad: ['', Validators.required],
      cp: ['', Validators.required],
      numTelCa: ['', Validators.required],
      numTelAsp: ['', Validators.required],
      numTelMaPa: ['', Validators.required],
      mail: ['', Validators.required],
      cD: ['', Validators.required],
      pD: ['', Validators.required],
      SLAO: ['', Validators.required],
      SLOI: ['', Validators.required],
      SLOD: ['', Validators.required],
      CLAO: ['', Validators.required],
      CLOI: ['', Validators.required],
      CLOD: ['', Validators.required],
      coment: ['', Validators.required],
      fechReg: ['', Validators.required],
      foto: ['',Validators.required],
      cert: ['', Validators.required],
      compDom: ['', Validators.required],
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');

    this.fileTypes['foto'] = 'image/jpeg';
    this.fileTypes['cert'] = 'application/pdf';
    this.fileTypes['compDom'] = 'application/pdf';
  }
  ngOnInit(): void {
    this.obtenerPacientes();
    this.obtenerCiudades();
    setTimeout(()=>{
      this.loader = false;
    }, 2000);
  }

  getFile($event: any, fieldName: string): void {
  const [file] = $event.target.files;

  // Asegúrate de que fileTypes[fieldName] exista antes de intentar leerlo
  if (!this.fileTypes[fieldName]) {
    console.error(`Tipo de archivo para ${fieldName} no está configurado.`);
    return;
  }

  // Crea un nuevo Blob con el mismo contenido y establece el nuevo tipo
  const modifiedBlob = new Blob([file], { type: this.fileTypes[fieldName] });

  // Asegúrate de que fileTmp[fieldName] exista antes de intentar asignarle propiedades
  if (!this.fileTmp[fieldName]) {
    this.fileTmp[fieldName] = {};
  }

  this.fileTmp[fieldName].fileRaw = modifiedBlob;
  this.fileTmp[fieldName].fileType = this.fileTypes[fieldName];
}

  sendFiles():void{

    const body = new FormData();

    body.append('nom',this.pacienteForm.get('nom')?.value);
    body.append('apeP',this.pacienteForm.get('apeP')?.value);
    body.append('apeM',this.pacienteForm.get('apeM')?.value);
    body.append('calle',this.pacienteForm.get('calle')?.value);
    body.append('no',this.pacienteForm.get('no')?.value);
    body.append('col',this.pacienteForm.get('col')?.value);
    body.append('ciudad',this.pacienteForm.get('ciudad')?.value);
    body.append('numTelCa',this.pacienteForm.get('numTelCa')?.value);
    body.append('cp',this.pacienteForm.get('cp')?.value);
    body.append('numTelAsp',this.pacienteForm.get('numTelAsp')?.value);
    body.append('numTelMaPa',this.pacienteForm.get('numTelMaPa')?.value);
    body.append('mail',this.pacienteForm.get('mail')?.value);
    body.append('cD',this.pacienteForm.get('cD')?.value);
    body.append('pD',this.pacienteForm.get('pD')?.value);
    body.append('SLAO',this.pacienteForm.get('SLAO')?.value);
    body.append('SLOI',this.pacienteForm.get('SLOI')?.value);
    body.append('SLOD',this.pacienteForm.get('SLOD')?.value);
    body.append('CLAO',this.pacienteForm.get('CLAO')?.value);
    body.append('CLOI',this.pacienteForm.get('CLOI')?.value);
    body.append('CLOD',this.pacienteForm.get('CLOD')?.value);
    body.append('coment',this.pacienteForm.get('apeMPa')?.value);
    body.append('foto', this.fileTmp['foto'].fileRaw, this.fileTmp['foto'].fileType);
    body.append('cert', this.fileTmp['cert'].fileRaw, this.fileTmp['cert'].fileType);

    this._pacienteService.guardarPaciente(body).subscribe(res => {
      if(res){
        Swal.fire('Se ha registrado el alumno!', res.message, 'success');
      }
    });


  }

  getBufferImageSrc(buffer: ArrayBuffer): SafeUrl {
    const blob = new Blob([buffer]);
    const imageUrl = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
}

getSanitizedImageUrl(base64String: string, imageType: string): SafeUrl {
    const imageUrl = `data:image/${imageType};base64,${base64String}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
}
  

  listPaciente: Paciente[] = [];


  obtenerPacientes() {
    this._pacienteService.getPacientes().subscribe(data => {
      console.log(data);
      this.listPaciente = data;
    },error => {
      console.log(error);
    })
  }

  listCiudad: Ciudad[] = [];

  obtenerCiudades() {
    this._pacienteService.getCiudades().subscribe(data => {
      console.log(data);
      this.listCiudad = data;
    },error => {
      console.log(error);
    })
    
  }

  

}
