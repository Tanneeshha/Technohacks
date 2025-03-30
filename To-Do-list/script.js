document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const emptyMessage = document.getElementById('empty-message');
    const totalTasksElement = document.getElementById('total-tasks');
    const completedTasksElement = document.getElementById('completed-tasks');
    
    // Stats
    let totalTasks = 0;
    let completedTasks = 0;
    
    // Load tasks from local storage
    loadTasks();
    
    // Add task when clicking the Add button
    addButton.addEventListener('click', addTask);
    
    // Add task when pressing Enter in the input field
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText === '') {
            // Animate the input field if empty
            taskInput.style.borderColor = '#f44336';
            setTimeout(() => {
                taskInput.style.borderColor = '#ddd';
            }, 500);
            return;
        }
        
        // Create a new task item
        const taskItem = createTaskElement(taskText);
        
        // Add the task to the list
        taskList.appendChild(taskItem);
        
        // Clear the input field
        taskInput.value = '';
        
        // Focus the input field
        taskInput.focus();
        
        // Update stats
        totalTasks++;
        updateStats();
        
        // Hide the empty message if needed
        toggleEmptyMessage();
        
        // Save tasks to local storage
        saveTasks();
    }
    
    // Function to create a new task element
    function createTaskElement(text, isCompleted = false) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        if (isCompleted) {
            taskItem.classList.add('completed');
        }
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = isCompleted;
        
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = text;
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Delete';
        
        // Toggle completion status when clicking the checkbox
        checkbox.addEventListener('change', function() {
            taskItem.classList.toggle('completed');
            
            if (checkbox.checked) {
                completedTasks++;
            } else {
                completedTasks--;
            }
            
            updateStats();
            saveTasks();
        });
        
        // Delete the task when clicking the delete button
        deleteButton.addEventListener('click', function() {
            taskItem.style.animation = 'fadeIn 0.5s reverse';
            
            setTimeout(() => {
                taskList.removeChild(taskItem);
                
                // Update stats
                totalTasks--;
                if (checkbox.checked) {
                    completedTasks--;
                }
                updateStats();
                
                // Show the empty message if needed
                toggleEmptyMessage();
                
                // Save tasks to local storage
                saveTasks();
            }, 500);
        });
        
        // Append elements to the task item
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteButton);
        
        return taskItem;
    }
    
    // Function to update stats
    function updateStats() {
        totalTasksElement.textContent = `Total: ${totalTasks}`;
        completedTasksElement.textContent = `Completed: ${completedTasks}`;
    }
    
    // Function to toggle the empty message
    function toggleEmptyMessage() {
        if (totalTasks === 0) {
            emptyMessage.style.display = 'block';
        } else {
            emptyMessage.style.display = 'none';
        }
    }
    
    // Function to save tasks to local storage
    function saveTasks() {
        const tasks = [];
        
        // Collect all tasks
        document.querySelectorAll('.task-item').forEach(function(taskItem) {
            const text = taskItem.querySelector('.task-text').textContent;
            const isCompleted = taskItem.classList.contains('completed');
            
            tasks.push({ text, isCompleted });
        });
        
        // Save to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Function to load tasks from local storage
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            
            tasks.forEach(function(task) {
                const taskItem = createTaskElement(task.text, task.isCompleted);
                taskList.appendChild(taskItem);
                
                // Update stats
                totalTasks++;
                if (task.isCompleted) {
                    completedTasks++;
                }
            });
            
            // Update stats display
            updateStats();
            
            // Toggle empty message
            toggleEmptyMessage();
        }
    }
    
    // Initial toggle of empty message
    toggleEmptyMessage();
});
