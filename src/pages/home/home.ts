import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private file: File,
    private fileChooser: FileChooser)
  {
    this.init();
  }

  init(){
    this.platform.ready().then(() => {
      window.addEventListener('filePluginIsReady', function(){
        console.log('File plugin is ready');
      }, false);
    });

    this.readTextFile('./assets/data.txt');
  }

  onInitFs(fs) {

  }

  onInitFsError(e) {
    console.log(e)
  }

  readTextFile(file){
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
      if(rawFile.readyState === 4)
      {
        if(rawFile.status === 200 || rawFile.status == 0)
        {
          // On affiche le contenu du fichier
          console.log(rawFile.responseText);
        }
      }
    }
    rawFile.send(null);
  }

  openFile(){

    //-- On est sur un appareil ou un émulateur
    if(this.platform.is('cordova')){

      // this.file.checkDir(this.file.dataDirectory, 'Downloads')
      //   .then(_ => console.log('Directory exists'))
      //   .catch(err => {
      //     console.log('Directory doesnt exist');
      //     console.log(this.file.dataDirectory);
      //   });

      }
      else{
        this.readTextFile('./assets/data.txt');
      }
  }

  openFile2(event){
    if(event){
      let file = event.target.files[0];
      console.log(file);
      let fr = new FileReader();
      //fr.onload = receivedText;
      //fr.readAsText(file);
    }

  }

}
