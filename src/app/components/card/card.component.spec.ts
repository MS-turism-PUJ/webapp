import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent] // Importar el componente a testear
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se crea correctamente
  });

  it('should display product name, provider, and price', () => {
    // Configurar valores para el @Input
    component.producto = {
      nombre: 'Mountain Tour',
      precio: 250
    };
    fixture.detectChanges(); // Detectar los cambios en el componente

    // Verificar que el nombre, proveedor y precio se renderizan correctamente en el HTML
    const nameElement = debugElement.query(By.css('.card-title')).nativeElement;
    const providerElement = debugElement.query(By.css('h2')).nativeElement;
    const priceElement = debugElement.query(By.css('.card-description')).nativeElement;

    expect(nameElement.textContent).toContain('Mountain Tour');
    expect(providerElement.textContent).toContain('Tourism Inc.');
    expect(priceElement.textContent).toContain('250');
  });

  it('should call addToCart method when button is clicked', () => {
    // Espiar el método addToCart
    spyOn(component, 'addToCart');

    // Simular un clic en el botón
    const button = debugElement.query(By.css('.cartBtn')).nativeElement;
    button.click();

    // Verificar que el método se llama
    expect(component.addToCart).toHaveBeenCalled();
  });

  it('should call mostrarAlerta method when button is clicked', () => {
    // Espiar el método mostrarAlerta
    spyOn(component, 'mostrarAlerta');

    // Simular un clic en el botón
    const button = debugElement.query(By.css('.cartBtn')).nativeElement;
    button.click();

    // Verificar que el método se llama
    expect(component.mostrarAlerta).toHaveBeenCalled();
  });
});
