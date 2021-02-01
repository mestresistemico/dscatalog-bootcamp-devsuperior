package com.mestresistemico.dscatalog.tests.integration;

import java.util.List;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;

import com.mestresistemico.dscatalog.dto.ProductDTO;
import com.mestresistemico.dscatalog.services.ProductService;
import com.mestresistemico.dscatalog.services.exceptions.ResourceNotFoundException;
import com.mestresistemico.dscatalog.tests.factory.ProductFactory;


@SpringBootTest
@Transactional
public class ProductServiceIT {
	
	@Autowired
	private ProductService service;
	
	private long existingId;
	private long nonExistingId;
	private long existingCategoryId;
	private long countTotalProducts;
	private long countPcGamerProducts;


	private ProductDTO productDTO;
	private PageImpl<ProductDTO> pageDTO;
	private PageRequest pageRequest;

	@BeforeEach
	void setup() throws Exception{
		existingId = 1L;
		nonExistingId = 1000000000000L;
		existingCategoryId = 1L;
		countTotalProducts = 25L;
		countPcGamerProducts = 21L;

		productDTO = ProductFactory.createProductDTO();
		pageDTO = new PageImpl<>(List.of(productDTO));
		pageRequest = PageRequest.of(0, 12, Direction.valueOf("ASC"), "name");
	}
	
	@Test
	public void findAllPagedShouldReturnNothingWhenNameDoesNotExist() {
		String name = "Cadkfçasdjfhladjfsd"; 
		Page<ProductDTO> result = service.findAllPaged(0L, name, pageRequest);
		Assertions.assertTrue(result.isEmpty());
	}
	
	@Test
	public void findAllPagedShouldReturnAllProductsWhenNameIsEmpty() {
		String name = ""; 
		Page<ProductDTO> result = service.findAllPaged(0L, name, pageRequest);
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
	}
	
	@Test
	public void findAllPagedShouldReturnProductsWhenNameExists() {
		String name = "PC Gamer"; 
		Page<ProductDTO> result = service.findAllPaged(0L, name, pageRequest);
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPcGamerProducts, result.getTotalElements());
	}

	@Test
	public void findAllPagedShouldReturnProductsWhenNameExistsIgnoringCase() {
		String name = "pc gAMeR"; 
		Page<ProductDTO> result = service.findAllPaged(0L, name, pageRequest);
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPcGamerProducts, result.getTotalElements());
	}
	
	@Test
	public void updateShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
		Assertions.assertThrows(ResourceNotFoundException.class, () ->{
			service.update(nonExistingId, productDTO);
		});
	}


	@Test
	public void updateShouldReturnProductDTOWhenIdExists() {
		ProductDTO result = service.update(existingId, productDTO);
		Assertions.assertSame(result, productDTO);
	}
	
	@Test
	public void findByIdShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
		Assertions.assertThrows(ResourceNotFoundException.class, () ->{
			service.findById(nonExistingId);
		});
	}

	@Test
	public void findByIdShouldReturnProductDTOWhenIdExists() {
		ProductDTO result = service.findById(existingId);		
		Assertions.assertSame(productDTO, result);
	}

	@Test
	public void findAllPagedShouldReturnPageProductDTO() {
		Page<ProductDTO> result = service.findAllPaged(existingCategoryId, "", pageRequest);		
		Assertions.assertSame(pageDTO, result);
	}

	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
		Assertions.assertThrows(ResourceNotFoundException.class, () ->{
			service.delete(nonExistingId);
		});
	}

	@Test
	public void deleteShouldDoNothingWhenIdExists() {
		Assertions.assertDoesNotThrow(() ->{
			service.delete(existingId);
		});
	}
}