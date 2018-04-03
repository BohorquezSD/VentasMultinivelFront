import { TestBed, inject } from '@angular/core/testing';

import { ConexionOracleService } from './conexion-oracle.service';

describe('ConexionOracleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConexionOracleService]
    });
  });

  it('should be created', inject([ConexionOracleService], (service: ConexionOracleService) => {
    expect(service).toBeTruthy();
  }));
});
