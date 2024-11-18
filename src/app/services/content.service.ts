import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(private apollo: Apollo) { }

  /**
   * Método para obtener la lista de contenidos desde el backend y mapearlos al modelo Producto.
   */
  getContents(page: number, limit: number): Observable<Producto[]> {
    return this.apollo.query<any>({
      query: gql`
        query findAllContents {
          query {
            findAllServices {
              serviceId
              price
              name
              description
              category
              capital
              currency
              officialName
              region
              language
              population
              latitude
              longitude
            }
          }
        }
      `,
      variables: {
        page,
        limit
      }
    }).pipe(
      // Mapear la respuesta al modelo Producto
      map(result => {
        const contents = result.data.findAllContents;
        return contents.map((content: any) => this.mapContentToProducto(content));
      })
    );
  }

  /**
   * Método auxiliar para transformar un contenido en un objeto Producto.
   */
  private mapContentToProducto(content: any): Producto {
    return {
      nombre: content.name,
      categoria: content.service?.name || 'Sin categoría',
      descripcion: content.description,
      pais: content.service?.country || 'No especificado',
      ciudad: content.service?.city || 'No especificada',
      precio: content.service?.price || 0,
      latitud: content.service?.latitude,
      longitud: content.service?.longitude,
      ruta: '', // Si la ruta no viene de la API, puedes dejarla vacía o agregar lógica adicional
      transporte: '', // Igual que la ruta
      fechaSalida: '', // Si estas propiedades vienen del backend, mapéalas
      fechaLlegada: ''
    };
  }
}
