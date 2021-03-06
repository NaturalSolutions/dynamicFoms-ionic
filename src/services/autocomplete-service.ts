import { Http } from '@angular/http';
import {Platform } from 'ionic-angular';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map'
//import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import _ from 'lodash'

@Injectable()
export class CompleteTaxaService {
  protocole : any;
  dbFieldName :any =  'NOM_NORMALISE';
  constructor(
    private http:Http,
    //private sqlite : SQLite,
    public platform: Platform
  ) {
  }

  getResults(item:string, protocole) {
    var _that = this;
        let tableName ;
        let itemNormalise = null;
        switch(protocole) {
          case 'avifaune': {
            tableName = 'Bird'
            break;
          }
          case 'herpetofaune': {
            tableName = 'Reptil'
            break;
          }
          case 'mammofaune': {
            tableName = 'Mammal'
            break;
          }
          case 'chiro' : {
            tableName = 'Chiroptera'
            break;
          }
          case 'flore' : {
            tableName = 'Flore';
            this.dbFieldName = 'LB_NOM';
            break;
          }
          case 'insectes' : {
            tableName = 'Insect',
            this.dbFieldName = 'LB_NOM';
            break;
          }
          default: {
            tableName = 'avifaune'
            break;
          }
      }

      itemNormalise = item.toLowerCase()
      itemNormalise = _.deburr(itemNormalise);

      let tab = [
        {
          "Rang" : "ES",
          "label" : "Grue demoiselle",
          "latin" : "Anthropoides virgo",
          "taxref_id" : 3081,
          "vernaculaire" :"Grue demoiselle" 
        },
        {
        "Rang" : "ES",
        "label" : "Macareux moine",
        "latin" : "Alca arctica",
        "taxref_id" : 3404,
        "vernaculaire" :"Macareux moine"
      }
    ]
    
    //var isMobile = navigator.platform == "Win32"

          return new Promise((resolve , reject) =>{


            //if(navigator.platform == "Win32") {
              // desktop version
              resolve(tab)
            /*} else {
                
                  _that.sqlite.create({
                    name: 'mydb.db',
                    location: 'default'
                  })
                    .then((db: SQLiteObject) => { 
                      console.log('open SQL');
                      db.executeSql('SELECT CD_NOM AS taxrefid, NOM_VERN AS label, NOM_VERN AS vernaculaire, LB_NOM AS latin, RANG AS Rang FROM '+tableName+' WHERE '+ this.dbFieldName +' LIKE "%'+itemNormalise+'%" ORDER BY LOWER(NOM_VERN) ASC', {})
                        .then((res) => {
                          db.close();
                          var data = []
                          for (var i =0 ; i < res.rows.length ; i++ ) {
                            data.push (res.rows.item(i));
                          }
                          resolve(data)
                        }
                      )
                      .catch(e => {
                        db.close();
                        resolve([]);
                        console.log(e);
                      });
                    })
                    
            } */
          });
      }
}