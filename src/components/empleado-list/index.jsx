import React from 'react'  
import EmpleadoRow from '../empleado-row'


function thumbnail (thumb) {
  return thumb ? thumb.smallThumbnail : '#';
}

class EmpleadoList extends React.Component {

  render() {
    return (
      <ul className="media-list">
        {
          this.props.listado.map((empleado) => {
           /* return <EmpleadoRow key={ empleado.id }
                                name={ empleado.fullName }
                                picture={ empleado.pic }
                                title={ empleado.title }
                                department={ empleado.department } />
          })*/
          return <EmpleadoRow  key={ empleado.key }
                               id={empleado.id}
                               title={ empleado.volumeInfo.title }
                               publishedDate={ empleado.volumeInfo.publishedDate }
                               description={ empleado.volumeInfo.description } 
                               thumbnail={thumbnail(empleado.volumeInfo.imageLinks)}
                               authors={empleado.volumeInfo.authors}
                               publisher={empleado.volumeInfo.publisher} />
          })
        }
      </ul>
    )
  }
}

export default EmpleadoList  