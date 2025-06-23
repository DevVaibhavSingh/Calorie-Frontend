"use client";
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Beef, Wheat, Droplets } from 'lucide-react';
import { Badge } from '@/components/ui/badge'; // Adjust path as needed

type Meal = {
    dish_name: string;
    servings: number;
    calories_per_serving: number;
    total_calories: number;
    source: string;
    datetime: string;
    protein?: number;
    carbs?: number;
    fat?: number;
};

interface MealTableProps {
    meals: Meal[];
}

export default function MealTable({ meals }: MealTableProps) {
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

    interface HandleExploreClick {
        (meal: Meal): void;
    }

    const handleExploreClick: HandleExploreClick = (meal) => {
        setSelectedMeal(meal);
    };

    const closeModal = () => {
        setSelectedMeal(null);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead>
                    <tr className="bg-gray-100 text-gray-700 text-sm">
                        <th className="px-4 py-2 text-left">Dish Name</th>
                        <th className="px-4 py-2 text-left">Servings</th>
                        <th className="px-4 py-2 text-left">Calories / Serving</th>
                        <th className="px-4 py-2 text-left">Total Calories</th>
                        <th className="px-4 py-2 text-left">Source</th>
                        <th className="px-4 py-2 text-left">Date & Time</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {meals.map((meal, idx) => (
                        <tr key={idx} className="border-t border-gray-200 text-sm">
                            <td className="px-4 py-2">{meal.dish_name}</td>
                            <td className="px-4 py-2">{meal.servings}</td>
                            <td className="px-4 py-2">{meal.calories_per_serving} cal</td>
                            <td className="px-4 py-2">{meal.total_calories} cal</td>
                            <td className="px-4 py-2">{meal.source}</td>
                            <td className="px-4 py-2">{meal.datetime}</td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => handleExploreClick(meal)}
                                    className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm"
                                >
                                    Explore
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for macro details */}
            {selectedMeal && (
                <Dialog open={true} onClose={closeModal} className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
                    <div className="bg-white p-6 rounded-lg shadow-xl z-50 w-[90%] max-w-xl">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Macro Nutrients for {selectedMeal.dish_name}
                        </h2>

                        <div className="grid grid-cols-3 gap-4">
                            {selectedMeal.protein && (
                                <div className="text-center">
                                    <div className="flex items-center justify-center mb-1">
                                        <Beef className="h-4 w-4 text-red-500 mr-1" />
                                        <Badge variant="secondary">Protein</Badge>
                                    </div>
                                    <div className="font-semibold">{selectedMeal.protein}g</div>
                                </div>
                            )}
                            {selectedMeal.carbs && (
                                <div className="text-center">
                                    <div className="flex items-center justify-center mb-1">
                                        <Wheat className="h-4 w-4 text-yellow-500 mr-1" />
                                        <Badge variant="secondary">Carbs</Badge>
                                    </div>
                                    <div className="font-semibold">{selectedMeal.carbs}g</div>
                                </div>
                            )}
                            {selectedMeal.fat && (
                                <div className="text-center">
                                    <div className="flex items-center justify-center mb-1">
                                        <Droplets className="h-4 w-4 text-blue-500 mr-1" />
                                        <Badge variant="secondary">Fat</Badge>
                                    </div>
                                    <div className="font-semibold">{selectedMeal.fat}g</div>
                                </div>
                            )}
                        </div>

                        <div className="text-right mt-6">
                            <button
                                onClick={closeModal}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </Dialog>
            )}
        </div>
    );
}
