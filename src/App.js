import React, { Component } from 'react';
import TarjetaLocation from './Componentes/TarjetaLocation';
import TableSignature from './Componentes/TableSignature';
import CampoTexto from './Componentes/CampoTexto';
import CampoSeleccion from './Componentes/CampoSeleccion';
import BarraMenu from './Componentes/BarraMenuCompany'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import CreateIcon from '@material-ui/icons/Create';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Clipboard from "react-clipboard.js";
import './App.css';
import {sedesMP,logosMP} from './data/datos.js'


function Logo(props) {
    return (
      <div style={{textAlign: 'left'}}>
        <img src={`./images/${props.logo}_w.svg`} alt="logo MP" height={50}/>
      </div>
    );
}

function SubHeader(props) {
    return (
      <header className="App-subheader">
        <Typography variant='h4' style={{color:'white'}}>Start to build your signature</Typography>
      </header>
    );
}

function SelectDomain(props){
  return (
    <div>
      <CampoSeleccion 
        valor={props.dominio} 
        handleSeleccion={props.dominioseleccionado} 
        listaseleccion={props.lista} 
        campolabel="dominio/domain" 
        campolabelayuda="dominio/domain" 
        name="seldomain" 
        keytoiterate="valor"/>
    </div>
  );
}

function MuestraInfoUserSiLogo(props){
  //Encuentra el objeto del arreglo 'logosMP' que coincide con el nombre del logo
  let filtradoLogo = logosMP.find((element)=>(element.name === props.logotipo)); //devuelve el objeto asociado al logo

  //bucle sobre las propiedades del objeto
  const domains = filtradoLogo.emaildomain; //objeto de dominios
/*
 // como ejemplo, para el caso de logo MP props.logotipo = MP, el objeto es
 //      {
 //         es : 'mpascensores.com',
 //         en : 'mplifts.com',
 //         fr : 'mpascenseurs.com',
 //         de : 'mpaufzuegue.com'
 //       }
 */
  const vectorclavesdominios = Object.keys(domains); //Array con las claves: ['se','es','en','fr','de']
  const listadoDominios = vectorclavesdominios.map(function(elem){
                                                        return {
                                                                  clave:elem,
                                                                  valor:domains[elem]
                                                                };
                                                      });
  /*como ejemplo, para el caso de logo MP "props.logotipo == MP", el objeto es:
        [
          {
            clave: 'es',
            valor : 'mpascensores.com'
          },
          {
            clave: 'en',
            valor : 'mplifts.com'
          },
..................y asi con el resto
      ]
  */
  let handleChange = (evt) => props.modifDatosPersonales(evt.target);
  let handleSelected =  (evt) => props.modifDatosDominio(evt);


  return (
    <React.Fragment>
            <Grid item xs={12}>
                <CampoTexto idvalue="username" namevalue="username" typevalue="text" labelvalue="nombre usuario" onChangevalue={handleChange}/>
                <CampoTexto idvalue="usersurname" namevalue="surname" typevalue="text" labelvalue="apellido usuario" onChangevalue={handleChange}/>
                <CampoTexto idvalue="jobtitleinnatiive" namevalue="nativejobtitle" typevalue="text" labelvalue="Job title native language" onChangevalue={handleChange}/>
                <CampoTexto idvalue="jobtitleinenglish" namevalue="englishjobtitle" typevalue="text" labelvalue="Job title other language" onChangevalue={handleChange}/>
                <CampoTexto idvalue="mobilephone" namevalue="mobilephone" typevalue="text" labelvalue="mobile phone" onChangevalue={handleChange}/>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={4}>
                  <CampoTexto idvalue="mailuser" namevalue="usermail" typevalue="text" labelvalue="email user" onChangevalue={handleChange}/>
                </Grid>
                <Grid item xs={1}>
                  <AlternateEmailIcon color="secondary"/>
                </Grid>
                <Grid item xs={7}>
                  <SelectDomain lista={listadoDominios} dominio={props.dominio} dominioseleccionado={handleSelected} />
                </Grid>
              </Grid>
            </Grid>
    </React.Fragment>
  );
}

function MuestraLocationUserSiLogo(props){
  //filtramos las ubicaciones según logo nombre
  let listadoubicaciones = sedesMP.filter((elem)=>elem.logoname === props.logotipo);
  let ubicacionesfinal = listadoubicaciones.map((elem)=>(<Grid item xs={4}><TarjetaLocation nombre={elem} manejaubicacion={props.handleselectedubicacion} /></Grid>));
  

  return (
      <React.Fragment>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Seleccione Centro de Trabajo: </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container wrap='wrap' alignContent="center">
                {ubicacionesfinal}
              </Grid>
            </Grid>
          </Grid>
      </React.Fragment>
    );
}
class MuestraLocationAlternativa extends React.Component {ç
  constructor(props){
    super(props);
    this.handleChangeAlternativa = this.handleChangeAlternativa.bind(this);
    this.state = {
      added : false,
    };
  }

  handleChangeAlternativa = (event)=>{
    this.props.handleDirAlternativa(event.target);
  };
  handlebanderaBotonAdd = () => {
    this.setState((state, props) => {
                return {added: !state.added};
              });
  }

  render(){
      return (
        <React.Fragment>
          <Grid container wrap='wrap'>
            <Grid item xs={3}>
              <Fab color="secondary" aria-label="Add" onClick={this.handlebanderaBotonAdd}>
                {!(this.state.added) ? <CreateIcon /> : <ArrowBackIcon />}
              </Fab>
            </Grid>
            {(this.state.added) ?
            (<Grid item xs={9}>
                <CampoTexto idvalue="dir1" namevalue="direccion1" typevalue="text" labelvalue="street, nº" valor={this.props.usuario.office.direccion1} onChangevalue={this.handleChangeAlternativa}/>
                <CampoTexto idvalue="dir2" namevalue="direccion2" typevalue="text" labelvalue="P.O. city, Country" valor={this.props.usuario.office.direccion2} onChangevalue={this.handleChangeAlternativa}/>
                <CampoTexto idvalue="ph1" namevalue="telefono1" typevalue="text" labelvalue="phone number" valor={this.props.usuario.office.telefono1} onChangevalue={this.handleChangeAlternativa}/>
                <CampoTexto idvalue="ph2" namevalue="telefono2" typevalue="text" labelvalue="fax number" valor={this.props.usuario.office.telefono2} onChangevalue={this.handleChangeAlternativa}/>
            </Grid>):(null)}
          </Grid>
      </React.Fragment>
        );
    }
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      nombrelogo : 'logo',
      pathlogo : 'logo',
      username : '',
      surname : '',
      usermail : '',
      maildomain : '',
      nativejobtitle : '',
      englishjobtitle : '',
      mobilephone : '',
      extofficephone : 0,
      office : null,
      webdomain : '',
      idioma:'en'
    };
    this.adaptaLogo = this.adaptaLogo.bind(this);
    this.adaptaDominio = this.adaptaDominio.bind(this);
    this.handleDatosPersonales = this.handleDatosPersonales.bind(this);
    this.handleDatosDominio = this.handleDatosDominio.bind(this);
    this.handleUbicacionSede = this.handleUbicacionSede.bind(this);
    this.handleUbicacionAlternativa = this.handleUbicacionAlternativa.bind(this);

  }

  adaptaLogo(nuevologo){
    let nuevologosinguion = nuevologo.replace(' ','-');
    this.setState({
      nombrelogo : nuevologo,
      pathlogo : nuevologosinguion,
      office:null
    });
  }
  adaptaDominio(nuevodominio){
    this.setState({usermail : nuevodominio});
  }
  handleDatosPersonales(valor){
    this.setState({[valor.name] : valor.value})
  };
  handleDatosDominio(event){
    const sedeselect = logosMP.find((elem)=>(elem.name === this.state.nombrelogo));
    const dominios = sedeselect.webdomain;
    const identifier = event.currentTarget.id;
    
    //console.log(event.currentTarget.id);
    //console.log(dominios);

    this.setState({
      maildomain : event.target.value,
      webdomain : dominios[identifier],
      idioma: identifier,
    });
  
  };
  handleUbicacionSede(valor){
    this.setState({
      office : valor,
    });
  }
  handleUbicacionAlternativa(valor){
    this.setState((state,props)=>{
      const nuevadir = state.office;
      nuevadir[valor.name] = valor.value;
      return ({office : nuevadir});
    });
  }

  render() {
    let nombrelogo = this.state.nombrelogo;
    return (
      <div className="App">
        <SubHeader />
        <div className="contenedor">
          <BarraMenu logo={nombrelogo} logoseleccionado={this.adaptaLogo} listaseleccion={logosMP} keytoiterate="name" logoicon={<Logo logo={this.state.pathlogo} />}/>
        </div>
        <div className="contenedor">
          <Grid container spacing={16} wrap='nowrap' justify='space-around'>
            <Grid item xs={5}>
                  <Grid container spacing={8} wrap='wrap'>
                    <Grid item xs={12}>
                      <Paper>
                        <Grid container alignContent="center">
                            {(nombrelogo !== 'logo')?(<MuestraInfoUserSiLogo logotipo={nombrelogo} dominio={this.state.maildomain} modifDatosPersonales={this.handleDatosPersonales} modifDatosDominio={this.handleDatosDominio} />):(null)}
                        </Grid>
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      {(nombrelogo !== 'logo')?(
                        <Grid container wrap='wrap'>
                          <Grid item xs={12}>
                            <MuestraLocationUserSiLogo logotipo={nombrelogo} handleselectedubicacion={this.handleUbicacionSede}/>
                          </Grid>
                          <Grid item xs={12}>
                            {(this.state.office!=null)?<MuestraLocationAlternativa usuario={this.state} handleDirAlternativa={this.handleUbicacionAlternativa}/>:null}
                          </Grid>
                        </Grid>
                        ):(null)}
                    </Grid>
                    
                  </Grid>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={6}>
              {(nombrelogo !== 'logo')?(
              <React.Fragment>
                <TableSignature usuario={this.state} logo={this.state.pathlogo} />
                <Clipboard component="a" button-href="#" data-clipboard-target="#copyfirma">
                  <Button variant="contained" size="small" style={{marginTop:40, marginLeft:250}}>
                    <SaveIcon />
                    Save / Copiar
                  </Button>
                </Clipboard>
              </React.Fragment>
                ):(null)}
            </Grid>
          </Grid>
        </div>

      </div>
    );
  }
}

export default App;
