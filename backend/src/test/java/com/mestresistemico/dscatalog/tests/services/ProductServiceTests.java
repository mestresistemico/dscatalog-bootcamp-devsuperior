package com.mestresistemico.dscatalog.tests.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.mestresistemico.dscatalog.dto.ProductDTO;
import com.mestresistemico.dscatalog.entities.Product;
import com.mestresistemico.dscatalog.repositories.ProductRepository;
import com.mestresistemico.dscatalog.services.ProductService;
import com.mestresistemico.dscatalog.services.exceptions.DatabaseException;
import com.mestresistemico.dscatalog.services.exceptions.ResourceNotFoundException;
import com.mestresistemico.dscatalog.tests.factory.ProductFactory;


@ExtendWith(SpringExtension.class)
public class ProductServiceTests {
	
	@InjectMocks
	private ProductService service;
	
	@Mock
	private ProductRepository repository;

	private long existingId;
	private long nonExistingId;
	private long dependentId;

	private Product product;
	private PageImpl<Product> page;
	private PageRequest pageRequest;

	@BeforeEach
	void setup() throws Exception{
		existingId = 1L;
		nonExistingId = 1000000000000L;
		dependentId = 4L;
		product = ProductFactory.createProduct();
		page = new PageImpl<>(List.of(product));

		pageRequest = PageRequest.of(0, 10);

		
		Mockito.when(repository.save(ArgumentMatchers.any())).thenReturn(product);

		Mockito.when(repository.find(ArgumentMatchers.any(), ArgumentMatchers.anyString(), ArgumentMatchers.any()))
		.thenReturn(page);
		
		Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(product));
		Mockito.when(repository.findById(nonExistingId)).thenReturn(Optional.empty());

		Mockito.when(repository.getOne(existingId)).thenReturn((product));
		Mockito.doThrow(EntityNotFoundException.class).when(repository).getOne(nonExistingId);
		
		Mockito.doNothing().when(repository).deleteById(existingId);
		Mockito.doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(nonExistingId);
		Mockito.doThrow(DataIntegrityViolationException.class).when(repository).deleteById(dependentId);
	}
	
	@Test
	public void updateShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
		ProductDTO dto = new ProductDTO();
		Assertions.assertThrows(ResourceNotFoundException.class, () ->{
			service.update(nonExistingId, dto);
		});
	}


	@Test
	public void updateShouldReturnProductDTOWhenIdExists() {
		ProductDTO dto = new ProductDTO();
		ProductDTO result = service.update(existingId, dto);
		Assertions.assertNotNull(result);
		Assertions.assertTrue(result instanceof ProductDTO);
		Mockito.verify(repository, Mockito.times(1)).save(product);
	}
	
	@Test
	public void findByIdShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
		Assertions.assertThrows(ResourceNotFoundException.class, () ->{
			service.findById(nonExistingId);
		});
		
		Mockito.verify(repository, Mockito.times(1)).findById(nonExistingId);
	}

	@Test
	public void findByIdShouldReturnProductDTOWhenIdExists() {
		ProductDTO result = service.findById(existingId);		
		Assertions.assertNotNull(result);
		Assertions.assertTrue(result instanceof ProductDTO);

		
		Mockito.verify(repository, Mockito.times(1)).findById(existingId);
	}

	@Test
	public void findAllPagedShouldReturnPageProductDTO() {
		Long categoryId = 0L;
		String name = "";
		Page<ProductDTO> result = service.findAllPaged(categoryId, name, pageRequest);		
		Assertions.assertNotNull(result);
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertTrue(result instanceof Page<?>);
		
		Mockito.verify(repository, Mockito.times(1)).find(null, name, pageRequest);
	}

	@Test
	public void deleteShouldThrowDatabaseExceptionWhenIdDepends() {
		Assertions.assertThrows(DatabaseException.class, () ->{
			service.delete(dependentId);
		});
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(dependentId);
	}

	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
		Assertions.assertThrows(ResourceNotFoundException.class, () ->{
			service.delete(nonExistingId);
		});
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(nonExistingId);
	}

	@Test
	public void deleteShouldDoNothingWhenIdExists() {
		Assertions.assertDoesNotThrow(() ->{
			service.delete(existingId);
		});
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(existingId);
	}
}