package com.mdshameer.weatherapplication.controller;

import com.hariprasatht.weatherapplication.service.WeatherAPIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/weather")
@CrossOrigin(origins = "http://localhost:3000")
public class weatherAPIController {

    @Autowired
    private WeatherAPIService apiService;

    @GetMapping("/{cityName}")
    public ResponseEntity<?> getWeather(@PathVariable String cityName) throws IOException {
        return apiService.makeApiCall(cityName);
    }
}
