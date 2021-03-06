import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';
import { ModalGenerico } from '../Modal/ModalGenerico';
//import {FormularioReservaAula} from '../ReservaAulas/FormularioReservaAula';
import { RegSolicitud } from './RegistroSol/RegSolicitud';
import { ModalRechazo } from '../Modal/ModalRechazo';


import './estilos-ver-soli.css';

export const Solicitudes = ({data=[]}) => {
    const [isSorted, setIsSorted] = useState({
        sortData:data,
        dir:"asc",
    });

    const [values, setValues] = useState({
        nombreDocenteSolicitud:'',
        apellidoDocenteSolicitud:'',
        numeroEstudiantesSolicitud: '',
        motivoSolicitud:'',
        fechaSolicitud:'',
        horaInicioSolicitud:'',
        periodoSolicitud:'',
        estadoSolicitud:'',
        materia_id:''

    });
    const[datos,setDatos]=useState({
        id:'',
        nombre:'',
        apellido:'',
        numero:'',
        motivo:'',
        fecha:'',
        hora:'',
        periodo:'',
        materia:'',
        grupo:'',
        idmateria:''

    });

    const { nombreDocenteSolicitud,apellidoDocenteSolicitud,numeroEstudiantesSolicitud,motivoSolicitud,fechaSolicitud,horaInicioSolicitud,periodoSolicitud,estadoSolicitud,materia_id} = values;
    const [ isOpen, openModalEdicion, closeModalEdicion ] = useModal(false);
    //Modal rechazo
    const[openModalRechazo,setOpenModalRechazo,closeModalRechazo]=useState(false);
    const{id,nombre,apellido,numero,motivo,fecha,hora,periodo,materia,grupo,idmateria}=datos
    const rechazarSolicitud = () => {
        setOpenModalRechazo(true)
    }


    const actualizar = (item) => {
        setValues({
            nombreDocenteSolicitud: item.nombreDocenteSolicitud,
            apellidoDocenteSolicitud: item.apellidoDocenteSolicitud,
            numeroEstudiantesSolicitud: item.numeroEstudiantesSolicitud,
            motivoSolicitud: item.motivoSolicitud,
            fechaSolicitud: item.fechaSolicitud,
            horaInicioSolicitud: item.horaInicioSolicitud,
            periodoSolicitud: item.periodoSolicitud,
            estadoDolicitud: item.estadoSolicitud,
            materia_id: item.materia_id
        });
        openModalEdicion();
    }
    const rechazar=(item)=>{
        setDatos({
            id:item.id,
            nombre:item.nombreDocenteSolicitud,
            apellido:item.apellidoDocenteSolicitud,
            numero:item.numeroEstudiantesSolicitud,
            motivo:item.motivoSolicitud,
            fecha:item.fechaSolicitud,
            hora:item.horaInicioSolicitud,
            periodo:item.periodoSolicitud,
            materia:item.materiaSolicitud,
            grupo:item.grupoSolicitud,
            idmateria:item.materia_id

        });
        setOpenModalRechazo(true)
    }
    
    
    const guardarID  = (id) => {
        localStorage.setItem("id", id);
    }
    

    function handleSort(){
        let sortedData=[];
        if(isSorted.dir==="asc"){
            sortedData=isSorted.sortData.sort((a,b)=>{
                return new Date(b.fechaSolicitud) - new Date(a.fechaSolicitud);
            });
            // isSorted.dir="desc"
            setIsSorted({sortData:[...sortedData],dir:"desc"})
        }else {
            sortedData=isSorted.sortData.sort((a,b)=>{
                return new Date(a.fechaSolicitud) - new Date(b.fechaSolicitud);
            });
            
            setIsSorted({sortData:[...sortedData],dir:"asc"})
            // isSorted.dir="asc"
        }  
    }
    
    //creado por vivi para unificar el boton admin solicitudes con el boton solicitudes
   const navigate=useNavigate();

    function handleNavigate(solicitud) {
        
        navigate("/admin/administrarsolicitud",{ state:solicitud })
    }
  
    return (
            <>
            <div className='contenedor-tabla-soli'>
                
                <table className='table'>
                    <thead>
                        <tr className='titulo-tabla-soli'>
                            <th>#</th>
                            <th>Nombre </th>
                            <th>Apellido</th>
                            <th>Materia</th>
                            <th>Grupo</th>
                            <th>Cantidad</th>
                            <th>Motivo</th>
                            <th onClick={handleSort}>Fecha</th>
                            <th>Hora</th>
                            <th>Estado</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>               
                    <tbody className='animate__animated animate__fadeIn'>
                        {
                            isSorted.sortData.map((item, i) => (
                                <tr key={item.id}>
                                    <td> { i+1 } </td>
                                    <td> { item.nombreDocenteSolicitud } </td>
                                    <td> { item.apellidoDocenteSolicitud } </td>
                                    <td> {item.materiaSolicitud}</td>
                                    <td> {item.grupoSolicitud} </td>
                                    <td> { item.numeroEstudiantesSolicitud } </td>
                                    <td> { item.motivoSolicitud } </td>
                                    <td> { item.fechaSolicitud } </td>
                                    <td> { item.horaInicioSolicitud } </td>
                                    <td> { item.estadoSolicitud[0].toUpperCase() +  item.estadoSolicitud.substring(1)} </td>
                                    <td className='td-btns-soli'>
                                        <section className='caja-btns-soli-admin'>
                                            <button 
                                                className='btn-ver-soli btns-solicitudes'
                                                onClick={ () => {actualizar(item)} }
                                            >
                                                <i className="bi bi-eye-fill"></i>
                                            </button>
                                            <button 
                                                className='btns-solicitudes'
                                                onClick={()=>{handleNavigate(item)}}
                                            >
                                                <i className="bi bi-clipboard2-plus-fill"></i>
                                            </button>

                                            <button 
                                                className='btns-rechazarsoli'
                                                onClick={()=>{rechazar(item)}}

                                            >
                                                <i  className="bi bi-trash3-fill"></i>
                                            </button>
                                        </section>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>  
                </table>
            </div>
            {
                isOpen &&
                <ModalGenerico isOpen={ isOpen } closeModal={closeModalEdicion}>
                    <RegSolicitud 
                    nombre_doc ={nombreDocenteSolicitud} 
                    ape_doc ={apellidoDocenteSolicitud} 
                    nro_est ={numeroEstudiantesSolicitud} 
                    motivo ={motivoSolicitud}
                    fecha_res ={fechaSolicitud}
                    hora_res ={horaInicioSolicitud}
                    periodo ={periodoSolicitud}
                    estado ={estadoSolicitud}
                    closeModal={closeModalEdicion} 
                    titulo='Detalles' 
                    materia_id={materia_id} />
                </ModalGenerico>
            }
            {openModalRechazo && 
            <ModalGenerico  isOpen={openModalRechazo} closeModal={closeModalRechazo}>
              <ModalRechazo 
              id_soli={id}
              nombre_doc={nombre}
              ape_doc={apellido}
              nro_est={numero}
              motivo={motivo}
              fecha_res={fecha}
              hora_res={hora}
              periodo={periodo}
              mat_soli={materia}
              grupo={grupo}
              mat_id={idmateria}
              closeModal={setOpenModalRechazo}/> 
            </ModalGenerico>
            }
            </>
    )
}
