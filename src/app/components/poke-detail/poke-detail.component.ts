import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss']
})
export class PokeDetailComponent implements OnInit {

  pokemon: any = '';
  pokemonImg = '';
  pokemonType = [];
  evolutions = [];

  constructor(private activatedRouter: ActivatedRoute,
              private pokemonService: PokemonService) {
    // obtiene parametro de la url
    this.activatedRouter.params.subscribe(
      params => {
        console.log(params.id);
        this.getPokemon(params.id);
        this.getevolutions(params.id);
      }
    );
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  getPokemon(id) {
    this.pokemonService.getPokemons(id).subscribe(
      res => {
        // console.log(res);
        this.pokemon = res;
        this.pokemonImg = this.pokemon.sprites.other.dream_world.front_default;
        this.pokemonType = res.types;
      },
      err => {
        console.log(err);
      }
    );
  }

  // tslint:disable-next-line: typedef
  getevolutions(id) {
    this.pokemonService.getevolutions(id).subscribe(
      res => {
         console.log(res.chain);
         this.evolutions = res;
      },
      err => {
        console.log(err);
      }
    );
  }

}
