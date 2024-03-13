/*
 * Copyright 2016-2024 NXP
 * All rights reserved.
 *
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * @file    Capstone.c
 * @brief   Application entry point.
 */
#include <stdio.h>
#include "board.h"
#include "peripherals.h"
#include "pin_mux.h"
#include "clock_config.h"
#include "MKL46Z4.h"
#include "fsl_debug_console.h"
/* TODO: insert other include files here. */

/* TODO: insert other definitions and declarations here. */

/*
 * @brief   Application entry point.
 */
int main(void) {

    /* Init board hardware. */
    BOARD_InitBootPins();
    BOARD_InitBootClocks();
    BOARD_InitBootPeripherals();
#ifndef BOARD_INIT_DEBUG_CONSOLE_PERIPHERAL
    /* Init FSL debug console. */
    BOARD_InitDebugConsole();
#endif

    PRINTF("Hello World\r\n");

    bool ledState = false;
    SIM->SCGC5 |= 1<<12;
    PORTD->PCR[5] &= ~0x700;
    PORTD->PCR[5] |= 0x700 & (1 << 8);
    GPIOD->PDDR |= (1 << 5);

    //----------Analog Input Setup----------
    SIM->SCGC6 |= 1<<27; // Clock Gating for ADC0
	SIM->SCGC5 |= 1<<13; // Clock gating for PORTE

	PORTE->PCR[16] &= ~0x700; // SET PTE16 MUX to 0

	ADC0->CFG1 = 0;
	ADC0->SC1[0] &= ~(1<<5);

	// Analog Calibrate
	ADC0->SC3 = 0x07; // Enable Maximum Hardware Averaging
	ADC0->SC3 |= 0x80; // Start Calibration

	// Wait for Calibration to Complete (either COCO or CALF)
	while(!(ADC0->SC1[0] & 0x80)){ }

	// Calibration Complete, write calibration registers.
	int cal_v = ADC0->CLP0 + ADC0->CLP1 + ADC0->CLP2 + ADC0->CLP3 + ADC0->CLP4 + ADC0->CLPS;
	cal_v = cal_v >> 1 | 0x8000;
	ADC0->PG = cal_v;

	ADC0->SC3 = 0; // Turn off Hardware Averaging
	//----------End Analog Input Setup----------

	/* Force the counter to be placed into memory. */
	volatile static int i = 0 ;
    /* Enter an infinite loop, just incrementing a counter. */
    while(1) {

    	ADC0->SC1[0] = 0x01; // Set Channel, starts conversion.
    	while(!(ADC0->SC1[0] & 0x80)){ }
    	int vibration = ADC0->R[0]; // Resets COCO

    	PRINTF("Vibration: %d\n", vibration);

    	i++;
        if (i % 100000 == 0) {
			ledState = !ledState;
			if(ledState) {
				GPIOD->PDOR |= (1<<5);
			}
			else {
			GPIOD->PDOR &= ~(1<<5);
			}
		}
    }
    return 0 ;
}
