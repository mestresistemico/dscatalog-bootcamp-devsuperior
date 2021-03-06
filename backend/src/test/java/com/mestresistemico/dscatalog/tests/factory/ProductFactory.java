package com.mestresistemico.dscatalog.tests.factory;

import java.time.Instant;

import com.mestresistemico.dscatalog.dto.ProductDTO;
import com.mestresistemico.dscatalog.entities.Category;
import com.mestresistemico.dscatalog.entities.Product;

public class ProductFactory {

	public static Product createProduct() {
		Product product = new Product(null, "Phone", "Good phone", 800.00, 
				"https://img.com/img.png", Instant.parse("2020-10-20T03:00:00Z"));
		product.getCategories().add(new Category(1L, null));
		return product;
	}

	public static ProductDTO createProductDTO() {
		Product product = createProduct();
		return new ProductDTO(product, product.getCategories());

	}

	public static ProductDTO createProductDTO(Long id) {
		ProductDTO dto = createProductDTO();
		dto.setId(id);
		return dto;

	}
}
