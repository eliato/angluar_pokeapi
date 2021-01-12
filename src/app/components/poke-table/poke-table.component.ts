import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit {
  // Columnas que se muestran de la tabla de angular material
  displayedColumns: string[] = ['position', 'image', 'name', 'type', 'abilities'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  pokemons = [];
  sortOrder = 1; 
  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  // tslint:disable-next-line: typedef
  getPokemons() {
    let pokemonData;
    
    for (let i = 1; i <= 150; i++) {
      this.pokemonService.getPokemons(i).subscribe(
        res => {
          pokemonData = {
            position: i,
            image: res.sprites.other.dream_world.front_default,
            name: res.name,
            type: res.types[0].type.name,
            abilities: res.abilities[0].ability.name
          };
          // ponemos la data que viene del servicio en un arreglo
          this.data.push(pokemonData);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  // Filtro para el paginador
  // tslint:disable-next-line: typedef
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

 // Obtiene elemento seleccionado
  // tslint:disable-next-line: typedef
  getRow(row){
    // console.log(row);
    this.router.navigateByUrl(`/pokeDetail/${row.position}`)
  }

  
}
